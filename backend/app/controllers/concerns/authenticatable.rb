# frozen_string_literal: true

# Authentication-related methods for controllers,
# including user login, logout, and session management.
module Authenticatable
  extend ActiveSupport::Concern

  included do
    helper_method :current_user, :logged_in?
  end

  # ───────────────────────── Public API ──────────────────────────────
  def log_in(user)
    session[:user_id] = user.id
  end

  def log_out
    session.delete(:user_id)
  end

  def current_user
    @current_user ||= User.active.find_by(id: session[:user_id])
  end

  def logged_in?
    current_user.present?
  end

  def authenticate_user!
    return if logged_in?

    render json: { error: 'You must be logged in' }, status: :unauthorized
  end
end
