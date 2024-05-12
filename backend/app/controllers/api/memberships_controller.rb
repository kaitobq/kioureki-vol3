class Api::MembershipsController < ApplicationController
  before_action :authenticate


  def create
    invitation = Invitation.find_by(token: params[:token], accepted: false)

    if invitation.nil?
      render json: { status: 'error', message: 'Invalid or expired token' }, status: :unprocessable_entity
      return
    end

    if Membership.exists?(user_id: @current_user.id, organization_id: invitation.organization_id)
      render json: { status: 'error', message: 'Membership already exists for this organization' }, status: :unprocessable_entity
      return
    end

    ActiveRecord::Base.transaction do
      organization = Organization.find(invitation.organization_id)
      membership = @current_user.memberships.build(organization_id: organization.id)

      if membership.save && invitation.update(accepted: true)
        render json: { status: 'success', membership: membership, organization_name: organization.name }, status: :created
      else
        raise ActiveRecord::Rollback, "Membership creation or invitation update failed"
      end
    end
  rescue ActiveRecord::Rollback
    render json: {
      status: 'error',
      errors: ["Membership creation or invitation update failed"] + membership.errors.full_messages + invitation.errors.full_messages
    }, status: :unprocessable_entity
  end

  private

  def membership_params
    params.require(:membership).permit(:organization_id, :role)
  end
end
