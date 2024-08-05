function toggleOtherReason() {
    var revisionReason = document.getElementById('revisionReason').value;
    var otherReasonDiv = document.getElementById('otherReasonDiv');
    if (revisionReason === 'other') {
        otherReasonDiv.style.display = 'block';
    } else {
        otherReasonDiv.style.display = 'none';
    }
}

// ------ 戸籍に記録されている者
function addRecord() {
    var recordsContainer = document.getElementById('recordsContainer');
    var recordDiv = document.createElement('div');
    recordDiv.className = 'record';
    recordDiv.innerHTML = `
                <label>名:</label>
                <input type="text" name="recordName" class="input-group-field">

                <label>生年月日:</label>
                <input type="date" name="recordBirthDate" class="input-group-field">

                <label>父:</label>
                <input type="text" name="recordFather" class="input-group-field">

                <label>母:</label>
                <input type="text" name="recordMother" class="input-group-field">

                <label>続柄:</label>
                <input type="text" name="recordRelation" class="input-group-field">

                <label>配偶者区分:</label>
                <input type="text" name="recordSpouse" class="input-group-field">

                <h3>身分事項・出生</h3>
                <label>出生日:</label>
                <input type="date" name="recordBirthDate" class="input-group-field">

                <label>出生地:</label>
                <input type="text" name="recordBirthPlace" class="input-group-field">

                <label>届出日:</label>
                <input type="date" name="recordReportDate">

                <label>届出日:</label>
                <input type="date" name="recordReportDate" class="input-group-field">

                <label>届出人:</label>
                <input type="text" name="recordReporter" class="input-group-field">

                <h3>婚姻</h3>
                <label>婚姻日:</label>
                <input type="date" name="recordMarriageDate" class="input-group-field">

                <label>配偶者氏名:</label>
                <input type="text" name="recordSpouseName" class="input-group-field">

                <label>従前戸籍・住所:</label>
                <input type="text" name="recordPreviousAddress" class="input-group-field">

                <label>従前戸籍・筆頭者名:</label>
                <input type="text" name="recordPreviousHead" class="input-group-field">

                <button type="button" class="button alert" onclick="removeRecord(this)">削除</button>
            `;
    recordsContainer.appendChild(recordDiv);
}

function removeRecord(button) {
    var recordDiv = button.parentElement;
    recordDiv.remove();
}

// for the initial modal
document.addEventListener('DOMContentLoaded', function () {
    var modal = new Foundation.Reveal($('#multiPageModal'));
    modal.open();

    $('.next-button').on('click', function () {
        var nextPage = $(this).data('next');
        $('.modal-page').hide();
        $('#' + nextPage).show();
    });

    $('.prev-button').on('click', function () {
        var prevPage = $(this).data('prev');
        $('.modal-page').hide();
        $('#' + prevPage).show();
    });
});

// The translation date is set to today's date by default
document.addEventListener('DOMContentLoaded', function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('translationDate').value = today;
});
