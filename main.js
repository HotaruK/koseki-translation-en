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
    const recordsContainer = document.getElementById('recordsContainer');
    const recordDiv = document.createElement('div');
    recordDiv.className = 'record';
    recordDiv.id = 'record-' + (recordsContainer.children.length + 1);
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

function formatDate(date) {
    if (date === "") {
        return ""
    }
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('en-US', options);
}

function generateDocument(event) {
    event.preventDefault();
    const form = document.getElementById('kosekiForm');
    const formData = new FormData(form);

    // head of family register
    const honseki = formData.get('honseki');
    const headName = formData.get('name');

    // matters of the family register
    const revisionReason = formData.get('revisionReason');
    const revisionDate = formatDate(formData.get('revisionDate'));
    const otherReasonTitle = formData.get('otherReasonTitle');
    const otherReasonDescription = formData.get('otherReasonDescription');

    let revisionReasonTitle = "";
    let revisionReasonDescription = "";
    switch (revisionReason) {
        case "kaisei":
            revisionReasonTitle = "Revision of the Family Register";
            revisionReasonDescription = "Revision of Family Register pursuant to Article 2, paragraph 1of supplementary Provisions, Ordinance of the Ministry of Justice NO.51 of 1994";
            break;
        case "other":
            revisionReasonTitle = otherReasonTitle;
            revisionReasonDescription = otherReasonDescription;
            break;
    }

    // person recorded in the family register
    const recordsContainer = document.getElementById('recordsContainer');
    const records = recordsContainer.getElementsByClassName('record');
    let personRecords = [];

    for (let i = 0; i < records.length; i++) {
        const record = records[i];

        const recordData = {
            recordId: i + 1,
            recordName: record.querySelector('input[name="recordName"]').value,
            recordBirthDate: formatDate(record.querySelector('input[name="recordBirthDate"]').value),
            recordFather: record.querySelector('input[name="recordFather"]').value,
            recordMother: record.querySelector('input[name="recordMother"]').value,
            recordRelation: record.querySelector('input[name="recordRelation"]').value,
            recordSpouse: record.querySelector('input[name="recordSpouse"]').value,
            recordBirthPlace: record.querySelector('input[name="recordBirthPlace"]').value,
            recordReportDate: formatDate(record.querySelector('input[name="recordReportDate"]').value),
            recordReporter: record.querySelector('input[name="recordReporter"]').value,
            recordMarriageDate: formatDate(record.querySelector('input[name="recordMarriageDate"]').value),
            recordSpouseName: record.querySelector('input[name="recordSpouseName"]').value,
            recordPreviousAddress: record.querySelector('input[name="recordPreviousAddress"]').value,
            recordPreviousHead: record.querySelector('input[name="recordPreviousHead"]').value
        };
        personRecords.push(recordData);
    }

    // issue information
    const issueNumber = formData.get('issueNumber');
    const issueDate = formatDate(formData.get('issueDate'));
    const issueCity = formData.get('issueCity');
    const issueType = formData.get('issueType');
    const issuePrefecture = formData.get('issuePrefecture');
    const issuerName = formData.get('issuerName');

    // translator infomation
    const translatorName = formData.get('translatorName');
    const translationDate = formatDate(formData.get('translationDate'));

    fetch('template.html')
        .then(response => response.text())
        .then(template => {
            const rendered = Mustache.render(template, {
                honseki: honseki,
                headName: headName,
                revisionReasonTitle: revisionReasonTitle,
                revisionReasonDescription: revisionReasonDescription,
                revisionDate: revisionDate,
                personRecords: personRecords,
                translatorName: translatorName,
                translationDate: translationDate,
                issueNumber: issueNumber,
                issueDate: issueDate,
                issueCity: issueCity,
                issueType: issueType,
                issuePrefecture: issuePrefecture,
                issuerName: issuerName
            });

            const newWindow = window.open('', '', 'width=800,height=600');
            newWindow.document.write(rendered);
            newWindow.document.close();
            newWindow.focus();
        });
}

