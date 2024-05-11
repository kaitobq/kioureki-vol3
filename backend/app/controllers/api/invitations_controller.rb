class Api::InvitationsController < ApplicationController
  before_action :authenticate
  before_action :set_organization, only: [:create]

  def create
    # トークンをセキュアランダムで生成
    token = SecureRandom.hex(10)
    # 正しくトークンをデータベースに保存
    invitation = @organization.invitations.create(token: token)

    if invitation.save
      render json: { status: 'success', token: token, organization_name: @organization.name }, status: :created
    else
      render json: { status: 'error', errors: invitation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end
end
