require "test_helper"

class Api::InvitationsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_invitations_create_url
    assert_response :success
  end
end
