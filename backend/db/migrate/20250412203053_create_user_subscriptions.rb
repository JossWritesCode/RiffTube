# frozen_string_literal: true

# Migration to create the user_subscriptions table with user and subscription references.
class CreateUserSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :user_subscriptions, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.uuid :subscription_id, null: false
      t.timestamp :started_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :ends_at

      t.timestamps
    end

    add_index :user_subscriptions, %i[user_id subscription_id], unique: true
  end
end
