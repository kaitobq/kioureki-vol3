class Api::MembershipsController < ApplicationController
  before_action :authenticate  # ユーザー認証を行う

  def create
    invitation = Invitation.find_by(token: params[:token], accepted: false)

    if invitation
      organization = Organization.find(invitation.organization_id)

      membership = @current_user.memberships.create(organization_id: organization.id)
      invitation.update(accepted: true)

      if membership.save
        render json: { status: 'success', membership: membership, organization_name: organization.name }, status: :created
      else
        render json: { status: 'error', errors: membership.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { status: 'error', message: 'Invalid or expired token' }, status: :unprocessable_entity
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:organization_id, :role)
  end
end
