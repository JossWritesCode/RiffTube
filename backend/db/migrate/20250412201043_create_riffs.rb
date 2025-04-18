# frozen_string_literal: true

# Migration to create the riffs table with associated foreign keys and attributes.
class CreateRiffs < ActiveRecord::Migration[7.0]
  def change
    create_table :riffs, id: :uuid do |t|
      t.uuid :created_by, null: false
      t.string :title
      t.uuid :latest_revision_id
      t.integer :current_version, default: 1
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :riffs, :users, column: :created_by
    add_foreign_key :riffs, :riff_versions, column: :latest_revision_id
  end
end
