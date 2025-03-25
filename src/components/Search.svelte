<script>

</script>

 <!-- search-popup start -->
 <div class="modal fade" id="seachmodal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="crap-search">
                  <!-- search-button-close start -->
                  <div class="button-close">
                    <button
                      type="button"
                      class="search-close"
                      data-bs-dismiss="modal"
                    >
                      <i class="feather-x"></i>
                    </button>
                  </div>
                  <!-- search-button-close end -->
                  <!-- search-form start -->
                  <form method="get" class="search-bar" id="searchForm">
                    <div class="form-search">
                      <input
                        type="search"
                        name="q"
                        id="searchInput"
                        placeholder="Search product here.."
                        class="input-text"
                        required
                      />
                      <button
                        type="button"
                        class="search-btn"
                        id="searchButton"
                      >
                        <i class="feather-search"></i>
                      </button>
                    </div>
                  </form>
                  <div id="searchResults" class="search-results"></div>
                  <!-- search-form end -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- search-popup end -->
