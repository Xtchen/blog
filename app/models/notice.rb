class Notice < ActiveRecord::Base
	attr_accessible :comment_id, :active
	default_scope order('created_at DESC')
	belongs_to :comment
end
