# frozen_string_literal: true

module Api
  module V1
    # Controller for handling user-related actions in API version 1.
    class UsersController < ApplicationController
      def signup
        user = User.new(user_params)

        if user.save
          session[:user_id] = user.id
          render json: { user: user.slice(:id, :email, :username, :name) }, status: :created

        else
          render json: { errors: user.errors.messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :name, :username)
      end
    end
  end
end
