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
      # 組織の作成に成功したら、作成者をメンバーとして追加
      membership = organization.memberships.create(user_id: @current_user.id, role: 'admin')
      if membership.valid?
        render json: { status: 'success', organization: organization, membership: membership }, status: :created
      else
        # メンバーシップの作成に失敗した場合、組織の作成を取り消す
        organization.destroy
        render json: { status: 'error', errors: membership.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { status: 'error', errors: organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def organization_params
    params.require(:organization).permit(:name)
  end
end
