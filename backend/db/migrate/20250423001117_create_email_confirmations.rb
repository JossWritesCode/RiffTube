# frozen_string_literal: true

# Migration to create the email_confirmations table, which stores tokens for confirming user emails.
class CreateEmailConfirmations < ActiveRecord::Migration[7.0]
  def change
    create_table :email_confirmations, id: :uuid do |t|
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.string   :token, null: false
      t.datetime :confirmed_at
      t.datetime :sent_at

      t.timestamps
    end

    add_index :email_confirmations, :token, unique: true
  end
end
