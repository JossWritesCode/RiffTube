class AuditLog < ApplicationRecord
  ## Associations
  belongs_to :user, optional: true
  belongs_to :entity, polymorphic: true

  ## Validations
  validates :action,      presence: true
  validates :entity_type, presence: true
  validates :entity_id,   presence: true
end
