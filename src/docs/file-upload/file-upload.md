# File Upload

## Purpose
Allows users to attach one or more files from their device. Supports drag-and-drop and click-to-browse interactions. Used in forms, messaging, and any workflow requiring document, image, or media uploads.

---

## Variants

| Component | Description |
|---|---|
| `File Upload / Single` | Accepts one file at a time — replaces selection on re-upload |
| `File Upload / Multiple` | Accepts many files — shows a growing list of attached files |
| `_Drop Zone` | The drag-and-drop target area |
| `_File` | A single file row showing name, size, status, and remove action |

---

## File States

| State | Description |
|---|---|
| `Default` | Idle — instruction text and icon visible |
| `Drag over` | File is being dragged over the zone — highlighted border |
| `Uploading` | File is transferring — progress indicator visible |
| `Uploaded` | Transfer complete — success icon |
| `Error` | Upload failed — error message + retry option |
| `Disabled` | Upload not allowed in current context |

---

## Tokens Used

| Property | Token |
|---|---|
| Drop zone border (default) | `semantic/action/neutral-subtle/border/default` |
| Drop zone border (drag over) | `component/button/primary/border/focused` |
| Drop zone background (default) | `semantic/background/Surface/Primary` |
| Drop zone background (drag over) | `semantic/background/primary-50` |
| Drop zone icon | `semantic/action/neutral-subtle/icon/default` |
| File row background | `semantic/background/neutral-25` |
| File row border | `semantic/action/neutral-subtle/border/default` |
| Progress bar fill | `semantic/background/primary-700` |
| Success icon | `semantic/background/success` |
| Error icon / text | `semantic/background/error` |
| Remove button | `semantic/action/neutral-subtle/icon/default` |
| Border radius | `semantic/spacing/sm` |
| Padding (drop zone) | `semantic/spacing/xl` |

---

## Usage Rules

- **Always provide a visible "Browse files" button** inside the drop zone — not all users can or will use drag-and-drop.
- **State the allowed file types and size limits** inside or below the drop zone (e.g., "PDF, DOCX up to 10 MB").
- **Show per-file progress** during upload. Do not replace the file row with a generic spinner.
- **Show per-file success and error states.** Do not batch-fail without indicating which files failed.
- **For Single upload**, replace the previous file immediately when a new one is chosen. Do not accumulate files.
- **For Multiple upload**, allow adding more files incrementally without removing previous selections.
- **Allow removing files** before final form submission via the × button on each file row.
- Validate file type and size **before** starting the upload — provide an inline error immediately.

---

## Accessibility Notes

- The drop zone should contain a `<label>` and `<input type="file">` for the native file chooser. The `<input>` can be visually hidden.
- For drag-and-drop, also handle keyboard activation: pressing `Enter` or `Space` on the drop zone opens the file chooser.
- `<input type="file">` accepts `accept=".pdf,.docx"` to filter in the OS dialog.
- For multiple files: `<input type="file" multiple>`.
- Each file row's remove button must have `aria-label="Remove [filename]"`.
- Progress for each file: `role="progressbar"` with `aria-valuenow` and `aria-label="Uploading [filename]"`.
- Announce successful uploads and errors with `aria-live="polite"`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Include a "Browse files" button alongside the drop zone | Use only drag-and-drop with no click-to-browse fallback |
| State accepted types and max size upfront | Surprise users with a type/size error after upload starts |
| Show per-file progress and status | Show a single global spinner for all uploads |
| Validate client-side before uploading | Only validate server-side after the full upload completes |
| Allow file removal before submission | Lock the file list after attachment |

---

## Example HTML Usage

```html
<!-- Single file upload -->
<div class="file-upload file-upload--single">
  <label for="avatar-upload" class="file-upload__label">Profile photo</label>
  <div
    class="file-upload__drop-zone"
    role="button"
    tabindex="0"
    aria-label="Upload profile photo. Drag and drop a file here or click to browse."
    aria-describedby="avatar-hint"
  >
    <svg class="file-upload__icon" aria-hidden="true" focusable="false"><!-- upload icon --></svg>
    <p class="file-upload__instruction">
      <strong>Click to upload</strong> or drag and drop
    </p>
    <p id="avatar-hint" class="file-upload__hint">JPG, PNG or GIF up to 2 MB</p>
    <input
      type="file"
      id="avatar-upload"
      name="avatar"
      accept=".jpg,.jpeg,.png,.gif"
      class="file-upload__input sr-only"
      aria-hidden="true"
    />
  </div>
</div>

<!-- Multiple file upload with file rows -->
<div class="file-upload file-upload--multiple">
  <label class="file-upload__label">Attachments</label>
  <div
    class="file-upload__drop-zone"
    role="button"
    tabindex="0"
    aria-label="Upload attachments. Drag files here or click to browse."
    aria-describedby="attach-hint"
  >
    <svg class="file-upload__icon" aria-hidden="true" focusable="false"><!-- upload icon --></svg>
    <p class="file-upload__instruction"><strong>Click to upload</strong> or drag and drop</p>
    <p id="attach-hint" class="file-upload__hint">PDF, DOCX, XLSX — max 10 MB each</p>
    <input
      type="file"
      id="attachments"
      name="attachments"
      accept=".pdf,.docx,.xlsx"
      multiple
      class="file-upload__input sr-only"
    />
  </div>

  <!-- File list -->
  <ul class="file-upload__list" aria-label="Attached files" aria-live="polite">
    <!-- Uploading -->
    <li class="file-upload__file file-upload__file--uploading">
      <svg class="file-upload__file-icon" aria-hidden="true"><!-- doc icon --></svg>
      <div class="file-upload__file-info">
        <span class="file-upload__file-name">report-q1.pdf</span>
        <span class="file-upload__file-size">2.4 MB</span>
        <div
          class="file-upload__progress"
          role="progressbar"
          aria-valuenow="60"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Uploading report-q1.pdf"
        >
          <div class="file-upload__progress-fill" style="width: 60%"></div>
        </div>
      </div>
      <button type="button" class="file-upload__remove" aria-label="Cancel upload of report-q1.pdf">
        <svg aria-hidden="true" focusable="false"><!-- X --></svg>
      </button>
    </li>

    <!-- Uploaded -->
    <li class="file-upload__file file-upload__file--success">
      <svg class="file-upload__file-icon" aria-hidden="true"><!-- doc icon --></svg>
      <div class="file-upload__file-info">
        <span class="file-upload__file-name">budget-2026.xlsx</span>
        <span class="file-upload__file-size">512 KB</span>
        <svg class="file-upload__success-icon" aria-label="Uploaded successfully" role="img"><!-- check --></svg>
      </div>
      <button type="button" class="file-upload__remove" aria-label="Remove budget-2026.xlsx">
        <svg aria-hidden="true" focusable="false"><!-- X --></svg>
      </button>
    </li>

    <!-- Error -->
    <li class="file-upload__file file-upload__file--error">
      <div class="file-upload__file-info">
        <span class="file-upload__file-name">video.mp4</span>
        <span class="file-upload__error-msg" role="alert">File type not allowed. Use PDF, DOCX, or XLSX.</span>
      </div>
      <button type="button" class="file-upload__remove" aria-label="Remove video.mp4">
        <svg aria-hidden="true" focusable="false"><!-- X --></svg>
      </button>
    </li>
  </ul>
</div>
```
