class AuditLog < ApplicationRecord
    belongs_to :user
  
    validates :action, presence: true
    validates :entity_type, presence: true
    validates :entity_id, presence: true
  end
  