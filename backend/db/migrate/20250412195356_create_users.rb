# frozen_string_literal: true

# Migration to create the users table with necessary fields and indexes.
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_users_table
    add_users_indexes
  end

  private

  def create_users_table
    create_table :users, id: :uuid do |tbl|
      add_user_basic_fields(tbl)
      add_user_auth_fields(tbl)
      add_user_metadata_fields(tbl)
      tbl.timestamps
    end
  end

  def add_user_basic_fields(tbl)
    tbl.string :email, null: false
    tbl.string :username, null: false
    tbl.string :name
  end

  def add_user_auth_fields(tbl)
    tbl.string :password_digest
    tbl.string :provider
    tbl.string :uid
  end

  def add_user_metadata_fields(tbl)
    tbl.string   :password_reset_token
    tbl.datetime :password_reset_sent_at
    tbl.datetime :deleted_at
  end

  def add_users_indexes
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
    add_index :users, :uid, unique: true
    add_index :users, :password_reset_token
  end
end
