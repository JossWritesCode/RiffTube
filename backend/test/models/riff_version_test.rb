# frozen_string_literal: true

require 'test_helper'

# Tests for RiffVersions
class RiffVersionTest < ActiveSupport::TestCase
  #   Assert that a RiffVersion without a version_number is invalid.
  test 'a RiffVersion without a version_number is invalid' do
    riff = create(:riff)
    user = create(:user)

    riff_version = build(:riff_version, riff: riff, changed_by_user: user, version_number: nil)
    assert_not riff_version.valid?
    assert_includes riff_version.errors[:version_number], "can't be blank"
  end

  #   Assert that version_number must be unique per riff_id (scoped uniqueness).
  test 'version_number must be unique per riff_id (scoped uniqueness)' do
    riff = create(:riff)
    user = create(:user)
    create(:riff_version, riff: riff, changed_by_user: user, version_number: 1)
    riff_version2 = build(:riff_version, riff: riff, changed_by_user: user, version_number: 1)
    # Duplicate version numbers should not be valid
    assert_not riff_version2.valid?
    assert_includes riff_version2.errors[:version_number], 'has already been taken'

    # Updated to a new version number, riff_version2 should be valid
    riff_version2.version_number = 2
    assert riff_version2.valid?
    assert_empty riff_version2.errors[:version_number]
  end

  #   Assert belongs_to :riff.
  test 'belongs_to :riff' do
    assoc = RiffVersion.reflect_on_association(:riff)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'Riff', assoc.class_name
    assert_equal 'riff_id', assoc.foreign_key
  end

  #   Assert belongs_to :media_file (optional).
  test 'belongs_to :media_file (optional)' do
    assoc = RiffVersion.reflect_on_association(:media_file)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'MediaFile', assoc.class_name
    assert_equal 'media_file_id', assoc.foreign_key
  end

  #   Assert belongs_to :changed_by_user (User, foreign_key changed_by).
  test 'belongs_to :changed_by_user (User, foreign_key changed_by)' do
    assoc = RiffVersion.reflect_on_association(:changed_by_user)
    assert_equal :belongs_to, assoc.macro
    assert_equal 'User', assoc.class_name
    assert_equal 'changed_by', assoc.foreign_key
  end

  #   Assert that audio_source can only be "recorded" or "synth".
  test 'audio_source can only be "recorded" or "synth"' do
    riff = create(:riff)
    user = create(:user)
    riff_version = build(:riff_version, riff: riff, changed_by_user: user, version_number: 1)

    riff_version.audio_source = 'recorded'
    assert riff_version.valid?

    riff_version.audio_source = 'synth'
    assert riff_version.valid?

    assert_raises(ArgumentError) do
      riff_version.audio_source = 'synthahol'
    end
  end

  #   Test setting and reading audio_source field.
  test 'Test setting and reading audio_source field' do
    riff = create(:riff)
    user = create(:user)
    riff_version = build(:riff_version, riff: riff, changed_by_user: user, version_number: 1)

    riff_version.audio_source = 'recorded'
    assert_equal riff_version.audio_source, 'recorded'

    riff_version.audio_source = 'synth'
    assert_equal riff_version.audio_source, 'synth'

    assert_raises(ArgumentError) do
      riff_version.audio_source = 'synthahol'
    end

    assert_equal riff_version.audio_source, 'synth'
  end
end
