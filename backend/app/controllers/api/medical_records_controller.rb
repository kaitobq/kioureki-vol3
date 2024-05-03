class Api::MedicalRecordsController < ApplicationController
  before_action :authenticate
  before_action :set_medical_record, only: [:show, :update, :destroy]

  # GET /api/medical_records
  def index
    if params[:organization_id]
      begin
        organization = @current_user.organizations.find(params[:organization_id])
        @medical_records = organization.medical_records
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Organization not found' }, status: :not_found
        return
      end
    else
      render json: { error: 'Organization ID is required' }, status: :bad_request
      return
    end

    render json: @medical_records
  end


  # GET /api/medical_records/1
  def show
    render json: @medical_record
  end

  # POST /api/medical_records
  def create
    begin
      @organization = @current_user.organizations.find(params[:organization_id])
      @medical_record = @organization.medical_records.build(medical_record_params)
      if @medical_record.save
        render json: @medical_record, status: :created, location: api_medical_record_url(@medical_record)
      else
        render json: @medical_record.errors, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Organization not found' }, status: :not_found
    end
  end


  # PATCH/PUT /api/medical_records/1
  def update
    if @medical_record.update(medical_record_params)
      render json: @medical_record
    else
      render json: @medical_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/medical_records/1
  def destroy
    @medical_record.destroy
    render json: { message: 'Medical record deleted successfully' }
  end

  private

  def set_medical_record
    @organization = @current_user.organizations.find(params[:organization_id])
    @medical_record = @organization.medical_records.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Medical record or organization not found' }, status: :not_found
  end


  def medical_record_params
    params.require(:medical_record).permit(:name, :part, :treatment_status, :diagnosis, :memo, :date_of_injury, :return_date, :organization_id)
  end
end
