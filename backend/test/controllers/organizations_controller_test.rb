require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get organizations_create_url
    assert_response :success
  end
end
