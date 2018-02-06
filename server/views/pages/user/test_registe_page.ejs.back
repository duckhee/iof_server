<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>

<section class="content-header">
	<h1>유저 회원가입 페이지</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
		<li class="active">Here</li>
	</ol>
</section>

<!-- Main content -->
<section class="content">
	<div class="box box-info">
		<form class="form-horizontal" name="regist_form" method="post" action="">
			<div class="box-body">
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">아이디</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="regist_id" placeholder="Id" name="id">
					</div>
					<button type="submit" id="overlap" class="btn btn-default">중복확인</button>
					<input type="hidden" id="idChk" value="N" /> 아이디는 대소문자, 숫자만 4~12자리까지 입력가능합니다.
				</div>
				<div class="form-group">
					<label for="inputPassword3"  class="col-sm-2 control-label">비밀번호</label>

					<div class="col-sm-2">
						<input type="text" class="form-control" id="regist_pw" placeholder="Password" name="pw">
					</div>
					영문, 숫자, 특수문자를 2가지 이상 혼합하여 10~20자리를 입력해주세요.
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">비밀번호 확인</label>

					<div class="col-sm-2">
						<input type="text" class="form-control" id="regist_pw2" placeholder="Password">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">이름</label>

					<div class="col-sm-2">
						<input type="text" class="form-control" id="regist_name" name="name" placeholder="name">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">이메일</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="regist_email" placeholder="Email" name="email">
					</div>
					<button type="submit" id="overlap_email" class="btn btn-default">중복확인</button>
					<input type="hidden" id="idChk_email" value="N" /> ex) ya63kr@nate.com
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">연락처</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="regist_phone" placeholder="Phone" name="phone">
					</div>
					'-' 없이 입력하세요.
				</div>

				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">주소</label> <input type="button" value="우편번호 찾기" class="btn btn-default" onclick="sample3_execDaumPostcode()">
					<div class="col-sm-2">
						<input type="text" class="form-control" id="sample3_postcode" placeholder="우편번호" name="zipcode">
						<div id="wrap" style="display: none; border: 1px solid; width: 500px; height: 300px; margin: 5px 0; position: relative">
							<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1" onclick="foldDaumPostcode()" alt="접기 버튼">
						</div>
					</div>
				</div>


				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label"></label>

					<div class="col-sm-4">
						<input type="text" class="form-control" id="sample3_address" name="addr1" placeholder="주소">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label"></label>

					<div class="col-sm-4">
						<input type="text" class="form-control" id="regist_addr3" name="addr2" placeholder="상세 주소">
					</div>
				</div>
			</div>
		</form>
		<div class="box-footer">
			<div class="col-sm-5">
				<button type="submit" class="btn btn-info pull-right" id='regist_in'>등록</button>
			</div>
			<div class="col-sm-1">
				<button type="submit" class="btn btn-info pull-right" id='regist_cancel'>취소</button>
			</div>
		</div>
	</div>
	<!-- /.box-body -->


	<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
	<script>
		// 우편번호 찾기 찾기 화면을 넣을 element
		var element_wrap = document.getElementById('wrap');

		function foldDaumPostcode() {
			// iframe을 넣은 element를 안보이게 한다.
			element_wrap.style.display = 'none';
		}

		function sample3_execDaumPostcode() {
			// 현재 scroll 위치를 저장해놓는다.
			var currentScroll = Math.max(document.body.scrollTop,
					document.documentElement.scrollTop);
			new daum.Postcode(
					{
						oncomplete : function(data) {
							// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

							// 각 주소의 노출 규칙에 따라 주소를 조합한다.
							// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
							var fullAddr = data.address; // 최종 주소 변수
							var extraAddr = ''; // 조합형 주소 변수

							// 기본 주소가 도로명 타입일때 조합한다.
							if (data.addressType === 'R') {
								//법정동명이 있을 경우 추가한다.
								if (data.bname !== '') {
									extraAddr += data.bname;
								}
								// 건물명이 있을 경우 추가한다.
								if (data.buildingName !== '') {
									extraAddr += (extraAddr !== '' ? ', '
											+ data.buildingName
											: data.buildingName);
								}
								// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
								fullAddr += (extraAddr !== '' ? ' ('
										+ extraAddr + ')' : '');
							}

							// 우편번호와 주소 정보를 해당 필드에 넣는다.
							document.getElementById('sample3_postcode').value = data.zonecode; //5자리 새우편번호 사용
							document.getElementById('sample3_address').value = fullAddr;

							// iframe을 넣은 element를 안보이게 한다.
							// (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
							element_wrap.style.display = 'none';

							// 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
							document.body.scrollTop = currentScroll;
						},
						// 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
						onresize : function(size) {
							element_wrap.style.height = size.height + 'px';
						},
						width : '100%',
						height : '100%'
					}).embed(element_wrap);

			// iframe을 넣은 element를 보이게 한다.
			element_wrap.style.display = 'block';
		}
	</script>

	<script type="text/javascript">
		function sendIt() {
			var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

			if ($('#regist_id').val() == "") {
				alert("아이디를 입력하지 않았습니다.");
				$('#regist_id').focus();
				return false;
			}
			//아이디에 공백 사용하지 않기
			if ($('#regist_id').val().indexOf(" ") >= 0) {
				alert("아이디에 공백을 사용할 수 없습니다.")
				$('#regist_id').focus();
				$('#regist_id').select();
				return false;
			}
			//아이디 유효성 검사 (영문소문자, 숫자만 허용)
			for (i = 0; i < $('#regist_id').val().length; i++) {
				var str = "";
				str = $('#regist_id').val();
				var ch = str.charAt(i)
				if (!(ch >= '0' && ch <= '9') && !(ch >= 'a' && ch <= 'z')
						&& !(ch >= 'A' && ch <= 'Z')) {
					alert("아이디는 대소문자, 숫자만 입력가능합니다.")
					$('#regist_id').focus();
					$('#regist_id').select();
					return false;
				}
			}
			//아이디 길이 체크 (4~12자)
			if ($('#regist_id').val().length < 4
					|| $('#regist_id').val().length > 12) {
				alert("아이디를 4~12자까지 입력해주세요.")
				$('#regist_id').focus();
				$('#regist_id').select();
				return false;
			}
			
				//비밀번호 입력여부 체크
				if ($('#regist_pw').val() == "" || $('#regist_pw2').val()== "") {
					alert("비밀번호를 입력해주세요.")
					return false;
				}
				else{
					if($('#regist_pw').val() == $('#regist_id').val()) {
						alert("아이디와 비밀번호가 같습니다.");
						$('#regist_pw').focus();
						return false;
					}
					if ($('#regist_pw').val() == $('#regist_id').val()) {
						alert("아이디와 비밀번호가 같습니다.");
						$('#regist_pw').focus();
						return false;
					}
					//비밀번호와 비밀번호 확인 일치여부 체크
					if ($('#regist_pw').val() != $('#regist_pw2').val()) {
						alert("비밀번호가 일치하지 않습니다");
						$('#regist_pw2').empty();
						$('#regist_pw2').focus();
						return false;
					}
					function chkPwd()
					{
						 var pw = $("#regist_pw").val();
						 var num = pw.search(/[0-9]/g);
						 var eng = pw.search(/[a-z]/ig);
						 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
						 var kore = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
						 if( kore.test(pw) ){
							 alert("한글은 사용이 불가능 합니다. \n영문,숫자, 특수문자만 아이디만 사용이 가능합니다.")
							 return false;
							 }
						 if(pw.length < 10 || pw.length > 20){
						  alert("비밀번호는 10자리 ~ 20자리 이내로 입력해주세요.");
						  return false;
						 }
						 if(pw.search(/₩s/) != -1){
						  alert("비밀번호는 공백없이 입력해주세요.");
						  return false;
						 }
						 if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
						  alert("영문,숫자,특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
						  return false;
						 }
						 return true;
						}
						if(!chkPwd( $.trim($('#regist_pw').val()))){
						   $('#regist_pw').val('');
						   $('#regist_pw').focus();
						   return false;
						}
				}
		
			

			if ($('#regist_name').val() == "") {
				alert("이름을 입력하지 않았습니다.")
				$('#regist_name').focus();
				return false;
			}

			if ($('#regist_email').val() == "") {
				alert("이메일을 입력하지 않았습니다.")
				$('#regist_email').focus();
				return false;
			}

			if ($('#regist_phone').val() == "") {
				alert("연락처를 입력하지 않았습니다.")
				$('#regist_phone').focus();
				return false;
			}

			if ($('#regist_addr1').val() == "") {
				alert("주소를 입력하지 않았습니다.")
				$('#regist_addr1').focus();
				return false;
			}
			if ($('#regist_addr2').val() == "") {
				alert("주소를 입력하지 않았습니다.")
				$('#regist_addr2').focus();
				return false;
			}
			if ($('#regist_addr3').val() == "") {
				alert("주소를 입력하지 않았습니다.")
				$('#regist_addr3').focus();
				return false;
			}
			if (!regExp.test($("#regist_email").val())) {
				alert("이메일 주소가 유효하지 않습니다");
				$("#regist_email").focus();
				return false;
			}
			if (!regPhone.test($('#regist_phone').val())) {
				alert("잘못된 휴대폰 번호입니다. 숫자만 입력하세요.");
				$("#regist_phone").focus();
				return false;
			}
			if ($("#idChk").val() == 'N') {
				alert('ID 중복 체크를 해주세요.');
				return false;
			}

			if ($("#idChk_email").val() == 'N') {
				alert('Email 중복 체크를 해주세요.');
				return false;
			}
		}

		$(document).ready(function() {

			$("#regist_cancel").click(function() {
				location.href="admin/user/list"
			});

			$("#regist_in").click(function() {
				res = sendIt();
				if (res == false) {
					
				} else {
					alert("회원 가입을 하였습니다.");
					document.regist_form.action = "regist";
					document.regist_form.method = "POST";
					document.regist_form.submit();
				}
			});

		});

		$(document).ready(function() {
			$('#overlap').on('click', function(evt) {
				evt.preventDefault();
				$.ajax({
					type : 'POST',
					url : '/user/check_id',
					data : {
						"user_id" : $('#regist_id').val()
					},
					success : function(data) {
						if ($.trim(data) == 0) {
							alert("등록 가능 합니다.");
							$("#idChk").val('Y');
						} else {
							alert("사용 불가 합니다.");
							$("#idChk").val('N');
						}
					}
				}); //end ajax    
			}); //end on    
		});

		$(document).ready(function() {
			$('#overlap_email').on('click', function(evt) {
				evt.preventDefault();
				$.ajax({
					type : 'POST',
					url : '/user/check_email',
					data : {
						"user_email" : $('#regist_email').val()
					},
					success : function(data) {
						if ($.trim(data) == 0) {
							alert("등록 가능 합니다.");
							$("#idChk_email").val('Y');
						} else {
							alert("사용 불가 합니다.");
							$("#idChk_email").val('N');
						}
					}
				}); //end ajax    
			}); //end on    

			$('#regist_id').change(function() {
				$("#idChk").val('N');
			});

			$('#regist_email').change(function() {
				$("#idChk_email").val('N');
			});
			
		});
	</script>


	<!-- /.box-footer -->
	<!-- /.content -->
</section>