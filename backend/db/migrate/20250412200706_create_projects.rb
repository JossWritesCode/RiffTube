# frozen_string_literal: true

# Migration to create the projects table with relevant fields and constraints.
class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_projects_table
    add_projects_indexes
    add_projects_foreign_keys
  end

  private

  def create_projects_table
    create_table :projects, id: :uuid do |table|
      add_project_columns(table)
      table.timestamps
    end
  end

  def add_project_columns(table)
    table.uuid     :owner_id,               null: false
    table.string   :title,                  null: false
    table.string   :video_host,             null: false
    table.string   :video_id
    table.text     :video_url
    table.string   :visibility, default: 'private'
    table.string   :shareable_link
    table.uuid     :forked_from_project_id
    table.datetime :deleted_at
  end

  def add_projects_indexes
    add_index :projects, :shareable_link, unique: true
  end

  def add_projects_foreign_keys
    add_foreign_key :projects, :users,    column: :owner_id
    add_foreign_key :projects, :projects, column: :forked_from_project_id
  end
end
