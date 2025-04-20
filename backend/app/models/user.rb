# frozen_string_literal: true

# The User class represents a user in the system. It includes validations, associations,
# and methods for managing user data, such as authentication, collaborations, and content.
class User < ApplicationRecord
  ## Validations
  has_secure_password
  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       format: {
                         with: /\A[a-zA-Z0-9_]+\z/,
                         message: 'can only contain letters, numbers, and underscores'
                       }
  validates :password, length: { minimum: 6 }, allow_nil: true, if: :password_required?
  before_validation :normalize_email
  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP },
                    length: { maximum: 255 }
  validates :uid, uniqueness: true, allow_nil: true
  validate  :uid_presence_if_provider

  ## Soft delete
  scope :active, -> { where(deleted_at: nil) }

  # Restore a soft-deleted user
  def restore
    update(deleted_at: nil)
  end

  ## Owned projects
  has_many :projects, foreign_key: :owner_id, dependent: :destroy, inverse_of: :owner

  ## Collaborations
  has_many :collaborations, dependent: :destroy
  has_many :project_memberships,
           through: :collaborations,
           source: :project

  ## Content
  has_many :created_riffs,
           class_name: 'Riff',
           foreign_key: :created_by,
           inverse_of: :creator,
           dependent: :destroy
  has_many :media_files, dependent: :destroy
  has_many :comments,    dependent: :destroy
  has_many :riff_reactions, dependent: :destroy
  has_many :riff_versions,
           foreign_key: :changed_by,
           inverse_of: :changed_by_user,
           dependent: :nullify

  ## Logs & prefs
  has_many :audit_logs, dependent: :nullify
  has_one  :user_preference, dependent: :destroy

  ## Social graph
  has_many :user_relationships,
           foreign_key: :from_user_id,
           dependent: :destroy,
           inverse_of: :from_user
  has_many :received_relationships,
           class_name: 'UserRelationship',
           foreign_key: :to_user_id,
           dependent: :destroy,
           inverse_of: :to_user

  ## Subscriptions
  has_many :user_subscriptions, dependent: :destroy
  has_many :subscriptions, through: :user_subscriptions

  private

  # Determines if a password is required for the user.
  # A password is required in the following cases:
  # 1. The user is not using an OAuth provider (i.e., `provider` is blank).
  # 2. The user is transitioning from OAuth to a regular account
  #    (i.e., `password_digest` is blank and `provider` has changed).
  # This ensures that users without an OAuth provider or those switching to a standard account must set a password.
  def password_required?
    provider.blank? || (password_digest.blank? && provider_changed?)
  end

  def uid_presence_if_provider
    return unless provider.present? && uid.blank?

    errors.add(:uid, "can't be blank if provider is set")
  end

  def normalize_email
    self.email = email.to_s.downcase.strip
  end
end
