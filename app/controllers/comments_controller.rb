class CommentsController < ApplicationController

	before_filter :admin_validate, :except => [:create]
	respond_to :html, :xml, :json

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
			#flash[:success] = 'Comment successfully posted!'
			respond_to do |format|
				#format.json { render :text => {:comments => Post.find(comment.post_id).comments, :count => Post.find(comment.post_id).comments.size, :signed => signed_in?, :valid => true}.to_json}
				#format.json { render :json => "test"}
				format.json { render :json => comment.my_to_json(signed_in?) }
			end
		else
			#flash[:error] = 'Faild! The comment should contain at least 6 letters!'
			respond_to do |format|
				format.json { render :json => {:saved => false}.to_json}
				#format.json { render :json => "test"}
			end
		end
		#redirect_to post_path(comment.post)
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
