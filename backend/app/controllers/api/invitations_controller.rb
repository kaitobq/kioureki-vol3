class Api::InvitationsController < ApplicationController
  before_action :authenticate
  before_action :set_organization, only: [:create]

  def create
    ActiveRecord::Base.transaction do
      token = generate_unique_token
      invitation = @organization.invitations.new(token: token)

      if invitation.save
        render json: { status: 'success', token: token, organization_name: @organization.name }, status: :created
      else
        render json: { status: 'error', errors: invitation.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end

  def generate_unique_token
    loop do
      token = SecureRandom.hex(10)
      break token unless Invitation.exists?(token: token)
    end
  end
end
