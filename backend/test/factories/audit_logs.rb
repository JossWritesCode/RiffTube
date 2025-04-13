FactoryBot.define do
    factory :audit_log do
      user
      action { "create" }
      entity_type { "User" }
      entity_id { SecureRandom.uuid }
      details { "Some details" }
    end
  end
  