class UptimeController < ApplicationController
  def check
    render json: {status: "ok" }, status: :ok
  end
end
