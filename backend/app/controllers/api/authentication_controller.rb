class Api::AuthenticationController < ApplicationController
    def login
        @user = User.find_by_email(params[:user][:email])
        if @user&.authenticate(params[:user][:password])
            token = create_token(@user.id)
            render json: {user: {name: @user.name, email: @user.email, token: token}}
        else
            render status: :unauthorized
        end
    end

    def validate
        authorization_header = request.headers[:authorization]
        if !authorization_header
            render_unauthorized
        else
            token = authorization_header.split(" ")[1]
            secret_key = Rails.application.credentials.secret_key_base

            begin
                decoded_token = JWT.decode(token, secret_key)
                @current_user = User.find(decoded_token[0]["user_id"])
                render json: { message: "Token is valid", user: { name: @current_user.name, email: @current_user.email } }, status: :ok
            rescue ActiveRecord::RecordNotFound
                render_unauthorized
            rescue JWT::DecodeError
                render_unauthorized
            end
        end
    end
end
