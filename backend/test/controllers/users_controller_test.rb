# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class UsersControllerTest < ActionDispatch::IntegrationTest
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
  end
end
