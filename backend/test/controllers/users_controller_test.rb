# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    # Test suite for the UsersController in the API V1 namespace
    class SignupSuccessTests < ActionDispatch::IntegrationTest
      test 'signup creates a user and sets session' do
        post '/api/v1/signup', params: {
          user: {
            email: 'new@example.com',
            password: 'securepass',
            username: 'newuser',
            name: 'Test User'
          }
        }

        assert_response :created
        assert session[:user_id].present?

        json = JSON.parse(response.body)
        assert_equal 'new@example.com', json['user']['email']
        assert_equal 'newuser', json['user']['username']
        assert_equal 'Test User', json['user']['name']
      end

      test 'signup downcases email before saving' do
        post '/api/v1/signup', params: {
          user: { email: 'UPPER@Example.COM', password: 'pw12345', username: 'u1', name: 'Name' }
        }
        assert_response :created
        json = JSON.parse(response.body)
        assert_equal 'upper@example.com', json['user']['email']
      end
    end

    # Test suite for signup failure scenarios in the API V1 namespace
    class SignupFailureTests < ActionDispatch::IntegrationTest
      test 'signup fails with missing parameters' do
        post '/api/v1/signup', params: {
          user: {
            email: '',
            password: '',
            username: '',
            name: ''
          }
        }

        assert_response :unprocessable_entity

        json = JSON.parse(response.body)
        assert_includes json['errors']['email'], "can't be blank"
        assert_includes json['errors']['password'], "can't be blank"
        assert_includes json['errors']['username'], "can't be blank"
      end

      test 'signup fails with too short of a password' do
        post '/api/v1/signup', params: {
          user: {
            email: 'shortpass@example.com',
            password: '12345',
            username: 'UserShortPass',
            name: 'Short Pass'
          }
        }

        assert_response :unprocessable_entity

        json = JSON.parse(response.body)
        assert_includes json['errors']['password'], 'is too short (minimum is 6 characters)'
      end

      test 'signup fails with invalid email format' do
        post '/api/v1/signup', params: {
          user: {
            email: 'invalid-email',
            password: 'securepass',
            username: 'unique_username',
            name: 'Test User'
          }
        }

        assert_response :unprocessable_entity
        json = JSON.parse(response.body)
        assert_includes json['errors']['email'], 'is invalid'
      end

      test 'signup fails with invalid username characters' do
        post '/api/v1/signup', params: {
          user: {
            email: 'invalidchars@example.com',
            password: 'securepass',
            username: 'invalid username!',
            name: 'Bad Username'
          }
        }

        assert_response :unprocessable_entity

        json = JSON.parse(response.body)

        assert_includes json['errors']['username'], 'can only contain letters, numbers, and underscores'
      end

      test 'signup fails with duplicate email' do
        existing_user = create(:user, email: 'duplicate@example.com')
        post '/api/v1/signup', params: {
          user: {
            email: existing_user.email,
            password: 'securepass',
            username: 'other_unique_username',
            name: 'New User'
          }
        }

        assert_response :unprocessable_entity
        json = JSON.parse(response.body)
        assert_includes json['errors']['email'], 'has already been taken'
      end

      test 'signup fails with duplicate username' do
        existing_user = create(:user, username: 'taken_username')
        post '/api/v1/signup', params: {
          user: {
            email: 'new_unique_email@example.com',
            password: 'securepass',
            username: existing_user.username,
            name: 'New User'
          }
        }

        assert_response :unprocessable_entity
        json = JSON.parse(response.body)
        assert_includes json['errors']['username'], 'has already been taken'
      end
    end

    # Test suite for the Me endpoint in the API V1 namespace
    class MeTests < ActionDispatch::IntegrationTest
      test 'me returns current user for authenticated session' do
        user = create(:user, username: 'crow', email: 'crow@example.com', password: 'secret123', name: 'Crow T Robot')
        log_in(user, 'secret123')

        get '/api/v1/me'
        assert_response :ok

        json = JSON.parse(response.body)
        assert_equal user.id,       json['user']['id']
        assert_equal user.email,    json['user']['email']
        assert_equal user.username, json['user']['username']
        assert_equal user.name,     json['user']['name']
      end

      test 'me returns 401 when not authenticated' do
        get '/api/v1/me'
        assert_response :unauthorized

        json = JSON.parse(response.body)
        assert_match(/must be logged in/i, json['error'])
      end
    end
  end
end
