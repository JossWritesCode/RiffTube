# frozen_string_literal: true

require 'test_helper'

# Tests for ProjectRiffs
class ProjectRiffTest < ActiveSupport::TestCase
  #   Assert that a ProjectRiff without a project_id is invalid.
  test 'a ProjectRiff without a project_id is invalid' do
    project_riff = build(:project_riff)
    assert_not project_riff.valid?
    assert_includes project_riff.errors[:project_id], "can't be blank"
  end

  #   Assert that a ProjectRiff without a riff_id is invalid.
  test 'a ProjectRiff without a riff_id is invalid' do
    project_riff = build(:project_riff)
    assert_not project_riff.valid?
    assert_includes project_riff.errors[:riff_id], "can't be blank"
  end

  #   Assert that a riff_id must be unique per project_id (scoped uniqueness).
  test 'a riff_id must be unique per project_id (scoped uniqueness)' do
    project = create(:project)
    project_riff_1 = create(:project_riff, project: project)
    project_riff_2 = build(:project_riff, project: project, riff_id: project_riff_1.riff_id)
    assert_not project_riff_2.valid?
    assert_includes project_riff_2.errors[:riff_id], 'already linked to this project'
  end

  #   Assert that start_time and end_time, if present, must be greater than or equal to 0.
  test 'start_time and end_time, if present, must be greater than or equal to 0' do
    project = create(:project)
    riff = create(:riff)
    project_riff = build(:project_riff, project: project, riff: riff)

    # nil values allowed
    assert project_riff.valid?

    # negative values are not allowed
    project_riff.start_time = -1
    project_riff.end_time = -2
    assert_not project_riff.valid?

    # positive values are allowed
    project_riff.start_time = 1
    project_riff.end_time = 2
    assert project_riff.valid?
  end

  #   Assert belongs_to :project.
  test 'belongs_to :project' do
    assoc = ProjectRiff.reflect_on_association(:project)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'Project', assoc.class_name
    assert_equal 'project_id', assoc.foreign_key
  end

  #   Assert belongs_to :riff.
  test 'belongs_to :riff' do
    assoc = ProjectRiff.reflect_on_association(:riff)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'Riff', assoc.class_name
    assert_equal 'riff_id', assoc.foreign_key
  end
end
