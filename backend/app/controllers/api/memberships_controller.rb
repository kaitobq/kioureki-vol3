class Api::MembershipsController < ApplicationController
  before_action :authenticate  # ユーザー認証を行う

  def create
    # 重複をチェック
    existing_membership = Membership.find_by(user_id: @current_user.id, organization_id: membership_params[:organization_id])
    if existing_membership
      render json: { status: 'error', message: 'You are already a member of this organization' }, status: :unprocessable_entity
      return
    end
    # @current_userはauthenticateメソッドでセットされる
    membership = Membership.new(membership_params.merge(user_id: @current_user.id))
    if membership.save
      render json: { status: 'success', membership: membership }, status: :created
    else
      render json: { status: 'error', errors: membership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:organization_id, :role)
  end
end
