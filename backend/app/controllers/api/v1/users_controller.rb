# frozen_string_literal: true

module Api
  module V1
    # Handles user creation
    class UsersController < ApplicationController
      include Authenticatable
      include ResponseRenderable

      before_action :authenticate_user!, only: [:me]

      def signup
        user = User.new(signup_params)

        if user.save
          log_in(user)
          render_created(user)
        else
          render_unprocessable(user)
        end
      end

      def me
        render_ok(current_user)
      end

      private

      def signup_params
        params.require(:user).permit(:email, :password, :name, :username)
      end
    end
  end
end
