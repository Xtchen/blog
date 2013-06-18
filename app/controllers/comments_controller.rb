class CommentsController < ApplicationController
	def create
		comment = Comment.new(params[:comment])
		if comment.author.blank?
			comment.author = "Anonymous"
		end
		if signed_in?
			comment.author = "Xiaotong"
			comment.mine = true
		else
			comment.mine = false
		end
		if comment.save
			redirect_to post_path(comment.post)
		else

		end
	end
	def new
		
	end
end
