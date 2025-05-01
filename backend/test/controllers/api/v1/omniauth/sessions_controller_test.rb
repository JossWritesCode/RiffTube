# frozen_string_literal: true

require 'test_helper'

# Tests for OmniAuth
class OmniAuth::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    OmniAuth.config.test_mode = true
  end

  # Assert that a new user logging in creates a new user and redirects properly
  test 'a user can sign up with a Google account' do
    # New user logging in
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
      {
        provider: 'google',
        uid: '1234567890',
        info: {
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    )

    # Assert one more user
    assert_difference('User.count', 1) do
      get '/api/v1/auth/google_oauth2/callback'
    end

    # Should redirect here
    assert_redirected_to '/api/v1/me'

    # The following could be a sanity check, but may just be unecessary

    # This should return the current user
    # get '/api/v1/me' # Or: response.header['Location']

    # assert_response :ok

    # json = JSON.parse(response.body)
    # assert_equal session[:user_id], json['user']['id']
  end

  # Assert that an existing user can log in
  test 'a user can sign in with a Google account' do
    # New user logging in
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
      {
        provider: 'google',
        uid: '1234567891',
        info: {
          email: 'joel@example.com',
          name: 'Joel Hodgeson'
        }
      }
    )

    get '/api/v1/auth/google_oauth2/callback'

    # Should redirect here
    assert_redirected_to '/api/v1/me'

    # Find user and assert session id
    user = User.find_by(email: 'joel@example.com')
    assert_equal session[:user_id], user.id

    # The following could be a sanity check, but may just be unecessary

    # This should return the current user
    # get '/api/v1/me' # Or: response.header['Location']

    # assert_response :ok

    # json = JSON.parse(response.body)
    # assert_equal session[:user_id], json['user']['id']
  end
end
