# frozen_string_literal: true

# This module provides functionality for email confirmation, including
# sending confirmation emails, checking confirmation status, and handling
# token-based email confirmation.
module EmailConfirmable
  extend ActiveSupport::Concern

  included do
    has_one :email_confirmation, dependent: :destroy
    after_commit :send_initial_confirmation_email, on: :create
  end

  # -------------------------------------------------------------------------
  # Public API
  # -------------------------------------------------------------------------

  # Sends (or re‑sends) a confirmation e‑mail. Re‑uses a fresh token or
  # regenerates a new one if the old token has expired.
  def send_confirmation_email!
    confirmation = build_or_refresh_confirmation!
    confirmation.deliver_confirmation_email
  end

  # Returns true once the account is confirmed.
  def email_confirmed?
    email_confirmation&.confirmed_at.present?
  end

  # Attempt to confirm the account with +token+.
  # Returns true on success, false on failure, and logs details.
  def confirm_email!(token)
    ec = email_confirmation
    return log_and_return_false('No EmailConfirmation record present') unless ec
    return log_and_return_false('Confirmation token expired')          if ec.token_expired?
    return log_and_return_false('Confirmation token mismatch')         unless secure_compare_token(ec.token, token)

    ec.confirm!
  rescue StandardError => e
    Rails.logger.error("[User##{id}] confirm_email! failed: #{e.class} – #{e.message}")
    false
  end

  # -------------------------------------------------------------------------
  # Helpers (private)
  # -------------------------------------------------------------------------
  private

  # Builds a new confirmation or regenerates the token if the current one is
  # expired, then returns the record.
  def build_or_refresh_confirmation!
    if email_confirmation.nil?
      build_email_confirmation.save!
    elsif email_confirmation.token_expired?
      email_confirmation.regenerate_token!
    end
    email_confirmation
  end

  def send_initial_confirmation_email
    send_confirmation_email!
  end

  def secure_compare_token(stored, given)
    ActiveSupport::SecurityUtils.secure_compare(stored, given)
  end

  def log_and_return_false(msg)
    Rails.logger.warn("[User##{id}] #{msg}")
    false
  end
end
