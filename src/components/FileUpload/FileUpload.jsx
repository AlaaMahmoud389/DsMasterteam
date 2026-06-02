import React, { useRef, useState, useCallback } from 'react';
import styles from './FileUpload.module.css';
import { Icon } from '../icons/Icon';

/* ── Spinner ──────────────────────────────────────────────────────── */
function Spinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}

/* ════════════════════════════════════════════════════════════════════
   _File  (FileItem)
   States: loading | uploaded | error
   ════════════════════════════════════════════════════════════════════ */
export function FileItem({ name, status = 'uploaded', errorMessage, onRemove, className }) {
  const isError = status === 'error';

  return (
    <div
      className={[styles.fileItem, isError && styles.fileItemError, className].filter(Boolean).join(' ')}
      role={isError ? 'alert' : undefined}
    >
      {/* Main row */}
      <div className={styles.fileItemRow}>
        <div className={styles.fileItemLeft}>
          {status === 'uploaded' && (
            <span className={styles.iconSuccess}>
              <Icon name="tick-circle" size={20} aria-hidden="true" />
            </span>
          )}
          {status === 'loading' && <Spinner />}
          {status === 'error' && (
            <span className={styles.iconError}>
              <Icon name="information-circle" size={20} aria-hidden="true" />
            </span>
          )}
          <span className={styles.fileName}>{name}</span>
        </div>
        {onRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={onRemove}
            aria-label={`Remove ${name}`}
          >
            <Icon name="cancel" size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Error message row */}
      {isError && errorMessage && (
        <div className={styles.errorMessageRow}>
          <span className={styles.errorMessageText}>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   _Drop Zone
   States: default | dragover | disabled
   ════════════════════════════════════════════════════════════════════ */
export function DropZone({
  hint,
  accept,
  multiple = false,
  disabled = false,
  isDragOver = false,
  onFileSelect,
  className,
}) {
  const inputRef = useRef(null);
  const [internalDragOver, setInternalDragOver] = useState(false);

  const dragOver = isDragOver || internalDragOver;

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) setInternalDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => setInternalDragOver(false), []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setInternalDragOver(false);
    if (disabled) return;
    const files = e.dataTransfer?.files;
    if (files?.length) onFileSelect?.(files);
  }, [disabled, onFileSelect]);

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      onFileSelect?.(e.target.files);
      e.target.value = '';
    }
  };

  const containerClass = [
    styles.dropZone,
    dragOver && styles.dropZoneDragOver,
    disabled && styles.dropZoneDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClass}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        className={styles.hiddenInput}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        tabIndex={-1}
      />

      {/* Upload icon */}
      <span className={styles.dropZoneIcon}>
        <Icon name="upload" size={24} aria-hidden="true" />
      </span>

      {/* Text */}
      <div className={styles.dropZoneText}>
        <p className={styles.dropZoneTitle}>Drag and drop files here to upload</p>
        {hint && <p className={styles.dropZoneHint}>{hint}</p>}
      </div>

      {/* Browse button (visual only — click on whole zone triggers input) */}
      <div className={styles.browseBtn}>
        <Icon name="arrow-right" size={20} aria-hidden="true" />
        <span>Browse Files</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   File Upload / Single
   Layout: header (label + hint) → browse button OR file item
   ════════════════════════════════════════════════════════════════════ */
export function FileUploadSingle({
  label = 'Upload files',
  hint,
  required = true,
  accept,
  value,
  onChange,
  onRemove,
  disabled = false,
  className,
}) {
  const inputRef = useRef(null);

  const hasFile = !!value;

  const handleBrowse = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files?.[0]) {
      onChange?.(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className={[styles.singleWrapper, className].filter(Boolean).join(' ')}>
      <input
        ref={inputRef}
        type="file"
        className={styles.hiddenInput}
        accept={accept}
        disabled={disabled}
        onChange={handleInputChange}
        tabIndex={-1}
      />

      {/* Header: label + hint */}
      <div className={styles.singleHeader}>
        <div className={styles.singleLabel}>
          {required && <span className={styles.requiredAsterisk}>*</span>}
          <span className={[styles.labelText, disabled && styles.labelTextDisabled].filter(Boolean).join(' ')}>{label}</span>
        </div>
        {hint && (
          <p className={[styles.singleHint, disabled && styles.singleHintDisabled].filter(Boolean).join(' ')}>{hint}</p>
        )}
      </div>

      {/* Browse button or uploaded file */}
      {hasFile ? (
        <FileItem
          name={value.name}
          status={value.status || 'uploaded'}
          errorMessage={value.errorMessage}
          onRemove={onRemove}
        />
      ) : (
        <button
          type="button"
          className={[styles.singleBrowseBtn, disabled && styles.singleBrowseBtnDisabled].filter(Boolean).join(' ')}
          onClick={handleBrowse}
          disabled={disabled}
        >
          <Icon name="arrow-right" size={20} aria-hidden="true" />
          <span>Browse Files</span>
        </button>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   File Upload / Multiple
   Layout: drop zone → file list
   ════════════════════════════════════════════════════════════════════ */
export function FileUploadMultiple({
  hint,
  accept,
  multiple = true,
  files = [],
  onChange,
  onRemove,
  disabled = false,
  className,
}) {
  return (
    <div className={[styles.multipleWrapper, className].filter(Boolean).join(' ')}>
      <DropZone
        hint={hint}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onFileSelect={onChange}
      />

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file) => (
            <FileItem
              key={file.id}
              name={file.name}
              status={file.status || 'uploaded'}
              errorMessage={file.errorMessage}
              onRemove={onRemove ? () => onRemove(file.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
