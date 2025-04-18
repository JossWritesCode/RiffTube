# frozen_string_literal: true

# Migration to create the users table with necessary fields and indexes.
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_users_table
    add_users_indexes
  end

  private

  def create_users_table
    create_table :users, id: :uuid do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :name
      t.string :password_digest
      t.string :provider
      t.string :uid
      t.datetime :deleted_at
      t.timestamps
    end
  end

  def add_users_indexes
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
    add_index :users, :uid, unique: true
  end
end
