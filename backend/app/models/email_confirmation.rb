# frozen_string_literal: true

# Handles generation, (re)-sending, and confirmation of email-verification tokens.
class EmailConfirmation < ApplicationRecord
  EXPIRATION_HOURS = 24 # tokens older than this are considered expired

  belongs_to :user

  # ------------------------------------------------------------------
  # Callbacks
  # ------------------------------------------------------------------
  # Set token + sent_at *before* validations so “token can’t be blank”
  # never fires during `save!`
  before_validation :generate_token_and_set_sent_at, on: :create

  # ------------------------------------------------------------------
  # Validations
  # ------------------------------------------------------------------
  validates :token, presence: true, uniqueness: true

  # ------------------------------------------------------------------
  # Public API
  # ------------------------------------------------------------------
  def confirm!
    return false if confirmed_at.present?

    update!(confirmed_at: Time.current)
  rescue ActiveRecord::ActiveRecordError => e
    Rails.logger.error("[EmailConfirmation] confirm! failed for id=#{id}: #{e.message}")
    false
  end

  def deliver_confirmation_email
    regenerate_token! if token_expired?
    UserMailer.confirmation_email(user).deliver_later
    update!(sent_at: Time.current)
  end

  # ------------------------------------------------------------------
  # Helper methods
  # ------------------------------------------------------------------
  def token_expired?
    sent_at < EXPIRATION_HOURS.hours.ago
  end

  def regenerate_token!
    update!(
      token: SecureRandom.hex(20),
      sent_at: Time.current,
      confirmed_at: nil
    )
  end

  # ------------------------------------------------------------------
  # Private
  # ------------------------------------------------------------------
  private

  # Only runs on create; sets fields if they aren’t already present
  def generate_token_and_set_sent_at
    self.token   ||= SecureRandom.hex(20)
    self.sent_at ||= Time.current
  end
end
