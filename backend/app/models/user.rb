class User < ApplicationRecord
  ## Validations
  validates :email, presence: true, uniqueness: true
  validates :uid,   uniqueness: true, allow_nil: true

  # Require password if not using OAuth
  has_secure_password validations: false
  validate  :password_required_unless_oauth

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

  def password_required_unless_oauth
    if provider.blank? && password_digest.blank?
      errors.add(:password, "can't be blank")
    end
  end
end
