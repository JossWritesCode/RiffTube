# frozen_string_literal: true

# Encapsulates password-reset token management for User
module PasswordResettable
  extend ActiveSupport::Concern

  # ---------------------------------------------------------------------------
  # Public API
  # ---------------------------------------------------------------------------

  def generate_password_reset!
    update!(
      password_reset_token: SecureRandom.hex(20),
      password_reset_sent_at: Time.current
    )
  end

  def clear_password_reset!
    update!(
      password_reset_token: nil,
      password_reset_sent_at: nil
    )
  end

  def password_reset_valid?(token, expiry_hours = 2)
    return false unless password_reset_sent_at
    return false if password_reset_sent_at < expiry_hours.hours.ago

    ActiveSupport::SecurityUtils.secure_compare(password_reset_token, token)
  end
end
