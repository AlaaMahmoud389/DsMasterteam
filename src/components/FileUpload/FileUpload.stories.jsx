import React, { useState } from 'react';
import { FileItem, DropZone, FileUploadSingle, FileUploadMultiple } from './FileUpload';

const HINT = 'Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.';

export default {
  title: 'Components/FileUpload',
  parameters: { layout: 'padded' },
};

/* ── _File — all states ─────────────────────────────────────── */
export const FileItemStates = {
  name: '_File — All states (Loading · Uploaded · Error)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Loading</p>
        <FileItem name="File-name.csv" status="loading" onRemove={() => {}} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Uploaded</p>
        <FileItem name="File-name.csv" status="uploaded" onRemove={() => {}} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Error</p>
        <FileItem name="File-name.csv" status="error" errorMessage="Here goes the helper text." onRemove={() => {}} />
      </div>
    </div>
  ),
};

/* ── _Drop Zone — all states ────────────────────────────────── */
export const DropZoneStates = {
  name: '_Drop Zone — All states (Default · Drag-over · Disabled)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Default</p>
        <DropZone hint={HINT} onFileSelect={() => {}} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Drag-over (simulated)</p>
        <DropZone hint={HINT} isDragOver onFileSelect={() => {}} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Disabled</p>
        <DropZone hint={HINT} disabled onFileSelect={() => {}} />
      </div>
    </div>
  ),
};

/* ── File Upload / Single — Default ────────────────────────── */
export const SingleDefault = {
  name: 'File Upload / Single — Default',
  render: () => (
    <div style={{ maxWidth: 400, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <FileUploadSingle label="Upload files" hint={HINT} required />
    </div>
  ),
};

export const SingleUploaded = {
  name: 'File Upload / Single — Uploaded',
  render: () => (
    <div style={{ maxWidth: 400, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <FileUploadSingle
        label="Upload files"
        hint={HINT}
        required
        value={{ name: 'File-name.csv', status: 'uploaded' }}
        onRemove={() => {}}
      />
    </div>
  ),
};

export const SingleDisabled = {
  name: 'File Upload / Single — Disabled',
  render: () => (
    <div style={{ maxWidth: 400, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <FileUploadSingle label="Upload files" hint={HINT} required disabled />
    </div>
  ),
};

export const SingleInteractive = {
  name: 'File Upload / Single — Interactive',
  render: () => {
    const [file, setFile] = useState(null);
    return (
      <div style={{ maxWidth: 400, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <FileUploadSingle
          label="Upload files"
          hint={HINT}
          required
          value={file}
          onChange={(f) => setFile({ name: f.name, status: 'uploaded' })}
          onRemove={() => setFile(null)}
        />
      </div>
    );
  },
};

/* ── File Upload / Multiple ─────────────────────────────────── */
export const MultipleDefault = {
  name: 'File Upload / Multiple — Default (drop zone only)',
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <FileUploadMultiple hint={HINT} />
    </div>
  ),
};

export const MultipleWithFiles = {
  name: 'File Upload / Multiple — With files (mixed states)',
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <FileUploadMultiple
        hint={HINT}
        files={[
          { id: '1', name: 'File-name.csv',  status: 'uploaded' },
          { id: '2', name: 'Document.pdf',    status: 'loading'  },
          { id: '3', name: 'Report.xlsx',     status: 'error', errorMessage: 'Here goes the helper text.' },
        ]}
        onRemove={() => {}}
      />
    </div>
  ),
};

export const MultipleDisabled = {
  name: 'File Upload / Multiple — Disabled',
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <FileUploadMultiple hint={HINT} disabled />
    </div>
  ),
};

export const MultipleInteractive = {
  name: 'File Upload / Multiple — Interactive',
  render: () => {
    const [files, setFiles] = useState([]);
    const handleChange = (fileList) => {
      const entries = Array.from(fileList).map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        name: f.name,
        status: 'uploaded',
      }));
      setFiles((prev) => [...prev, ...entries]);
    };
    return (
      <div style={{ maxWidth: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <FileUploadMultiple
          hint={HINT}
          multiple
          files={files}
          onChange={handleChange}
          onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        />
        {files.length > 0 && (
          <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    );
  },
};
