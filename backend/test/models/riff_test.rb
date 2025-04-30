# frozen_string_literal: true

require 'test_helper'

# Tests for Riffs
class RiffTest < ActiveSupport::TestCase
  # Sanity check to ensure the factory builds a valid riff
  test 'factory is valid' do
    assert create(:riff).valid?
  end

  #   Assert riff without a title is valid
  test 'allows riff without a title' do
    riff = create(:riff, title: nil)
    assert riff.valid?
  end

  #   Assert that a Riff without a created_by (creator) is invalid.
  test 'a Riff without a created_by (creator) is invalid' do
    riff = build(:riff, creator: nil)
    assert_not riff.valid?
  end

  #   Assert belongs_to :creator (must link to a User via created_by).
  test 'belongs_to :creator (must link to a User via created_by)' do
    assoc = Riff.reflect_on_association(:creator)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'User', assoc.class_name
    assert_equal 'created_by', assoc.foreign_key
  end

  #   Assert riff without latest_revision is valid
  test 'allows riff without latest_revision by default' do
    assert create(:riff, latest_revision: nil).valid?
  end

  #   Assert belongs_to :latest_revision (optional).
  test 'belongs_to :latest_revision (optional)' do
    assoc = Riff.reflect_on_association(:latest_revision)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'RiffVersion', assoc.class_name
    assert_equal 'latest_revision_id', assoc.foreign_key
  end

  #   Assert has_many :riff_versions.
  test 'has_many :riff_versions' do
    assoc = Riff.reflect_on_association(:riff_versions)
    assert_equal :has_many, assoc.macro
    assert_equal 'RiffVersion', assoc.class_name
    assert_equal 'riff_id', assoc.foreign_key
  end

  #   Assert has_many :project_riffs.
  test 'has_many :project_riffs' do
    assoc = Riff.reflect_on_association(:project_riffs)
    assert_equal :has_many, assoc.macro
    assert_equal 'ProjectRiff', assoc.class_name
    assert_equal 'riff_id', assoc.foreign_key

    riff = create(:riff)
    project_riff = create(:project_riff, riff: riff)
    assert_includes riff.projects, project_riff.project
  end

  #   Assert has_many :projects, through: :project_riffs.
  test 'has_many :projects, through: :project_riffs' do
    assoc = Riff.reflect_on_association(:projects)
    assert_equal :has_many, assoc.macro
    assert_equal 'Project', assoc.class_name
    assert_equal 'ProjectRiff', assoc.through_reflection.class_name
    assert_equal 'project_id', assoc.foreign_key
  end

  #   Assert has_many :comments (polymorphic commentable).
  test 'has_many :comments (polymorphic commentable)' do
    assoc = Riff.reflect_on_association(:comments)
    assert_equal :has_many, assoc.macro
    assert_equal 'Comment', assoc.class_name
    assert_equal 'commentable_id', assoc.foreign_key
  end

  #   Assert has_many :riff_reactions.
  test 'has_many :riff_reactions' do
    assoc = Riff.reflect_on_association(:riff_reactions)
    assert_equal :has_many, assoc.macro
    assert_equal 'RiffReaction', assoc.class_name
    assert_equal 'riff_id', assoc.foreign_key
  end
end
