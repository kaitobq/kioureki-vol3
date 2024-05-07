class Api::OrganizationsController < ApplicationController
  before_action :authenticate

  def index
    organizations = @current_user.organizations

    if organizations.any?
      render json: organizations, status: :ok
    else
      render json: { message: 'No organizations found' }, status: :not_found
    end
  end

  def create
    organization = Organization.new(organization_params)
    if organization.save
      render json: { status: 'success', organization: organization }, status: :created
    else
      render json: { status: 'error', errors: organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def organization_params
    params.require(:organization).permit(:name)
  end
end
