class Comment < ActiveRecord::Base
	attr_accessible :author, :content, :post_id
	belongs_to :post
	validates :content, :presence => true
	validates :content, :length => { :minimum => 6 }
end
