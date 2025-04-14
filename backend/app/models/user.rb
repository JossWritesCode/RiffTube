class User < ApplicationRecord
  ## Validations
  has_secure_password

  validates :password, length: { minimum: 6 }, allow_nil: true, if: :password_required?
  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP },
                    length: { maximum: 255 }
  validates :uid, uniqueness: true, allow_nil: true
  validate  :uid_presence_if_provider

  # Soft delete
  default_scope { where(deleted_at: nil) }

  ## Owned projects
  has_many :projects, foreign_key: :owner_id, dependent: :destroy

  ## Collaborations
  has_many :collaborations, dependent: :destroy
  has_many :project_memberships,
           through: :collaborations,
           source:  :project

  ## Content
  has_many :riffs,       foreign_key: :created_by, dependent: :destroy
  has_many :media_files, dependent: :destroy
  has_many :comments,    dependent: :destroy
  has_many :riff_reactions, dependent: :destroy

  ## Logs & prefs
  has_many :audit_logs, dependent: :nullify
  has_one  :user_preference, dependent: :destroy

  ## Social graph
  has_many :user_relationships,
           foreign_key: :from_user_id,
           dependent:   :destroy
  has_many :received_relationships,
           class_name:  "UserRelationship",
           foreign_key: :to_user_id,
           dependent:   :destroy

  ## Subscriptions
  has_many :user_subscriptions, dependent: :destroy
  has_many :subscriptions, through: :user_subscriptions

  private

  def password_required?
    provider.blank? || (!password_digest.present? && provider_changed?)
  end

  def uid_presence_if_provider
    if provider.present? && uid.blank?
      errors.add(:uid, "can't be blank if provider is set")
    end
  end
end
