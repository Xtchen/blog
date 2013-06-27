class NoticesController < ApplicationController
	before_filter :admin_validate, :only => [:index, :viewAll]

	def index
		@notices = Notice.paginate(:page => params[:page], :per_page => 20)
	end

	def show
		notice = Notice.find params[:id]
		notice.update_attributes({:active => false})
		redirect_to notice.comment.post
	end

	def viewAll

	end

end
