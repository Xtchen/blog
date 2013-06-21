class CommentsController < ApplicationController

	before_filter :admin_validate, :except => [:create]

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
			flash[:success] = 'Comment successfully posted!'
		else
			flash[:error] = 'Faild! The comment should contain at least 6 letters!'
		end
		redirect_to post_path(comment.post)
	end

	def new
		
	end

	def destroy
		comment = Comment.find params[:id]
		if Comment.delete comment
			flash[:success] = 'Comment deleted! '
		else
			flash[:error] = 'faild to delete this comment! '
		end
		redirect_to post_path(comment.post)
	end
end
