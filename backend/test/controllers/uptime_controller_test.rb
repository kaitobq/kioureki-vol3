require "test_helper"

class UptimeControllerTest < ActionDispatch::IntegrationTest
  test "should get check" do
    get uptime_check_url
    assert_response :success
  end
end
