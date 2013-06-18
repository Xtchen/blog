class Comment < ActiveRecord::Base
	attr_accessible :author, :content, :post_id
	belongs_to :post
end
