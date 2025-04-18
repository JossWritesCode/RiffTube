# frozen_string_literal: true

# This migration creates the user_relationships table to store relationships between users such as block or follow
class CreateUserRelationships < ActiveRecord::Migration[7.0]
  def change
    create_user_relationships_table
    add_user_relationship_indexes
  end

  private

  def create_user_relationships_table
    create_table :user_relationships, id: :uuid do |table|
      table.uuid      :from_user_id,      null: false
      table.uuid      :to_user_id,        null: false
      table.string    :relationship_type
      table.datetime  :deleted_at
      table.timestamps
    end
  end

  def add_user_relationship_indexes
    add_index :user_relationships,
              %i[from_user_id to_user_id relationship_type],
              unique: true,
              name: 'index_user_relationships_unique'
  end
end
