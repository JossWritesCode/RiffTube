class AuditLog < ApplicationRecord
  ## Associations
  belongs_to :user
  belongs_to :entity, polymorphic: true

  ## Validations
  validates :user_id,     presence: true
  validates :action,      presence: true
  validates :entity_type, presence: true
  validates :entity_id,   presence: true
end
