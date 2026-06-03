import React, { useState } from 'react';
import { FileItem, DropZone, FileUploadSingle, FileUploadMultiple } from './FileUpload';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1936';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

const HINT = 'Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.';

export default {
  title: 'Components/FileUpload',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
};

/* ════════════════════════════════════════════════════════════════════
   1.  _File — FileItem states
   ════════════════════════════════════════════════════════════════════ */
export const FileItemStates = {
  name: '_File — All states (Loading · Uploaded · Error)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 520, fontFamily: FONT }}>

      <div>
        <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Loading
        </div>
        <FileItem
          name="File-name.csv"
          status="loading"
          onRemove={() => {}}
        />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Uploaded
        </div>
        <FileItem
          name="File-name.csv"
          status="uploaded"
          onRemove={() => {}}
        />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Error
        </div>
        <FileItem
          name="File-name.csv"
          status="error"
          errorMessage="Here goes the helper text."
          onRemove={() => {}}
        />
      </div>

    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   2.  _Drop Zone — states
   ════════════════════════════════════════════════════════════════════ */
export const DropZoneStates = {
  name: '_Drop Zone — All states (Default · Drag-over · Disabled)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 520, fontFamily: FONT }}>

      <div>
        <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Default
        </div>
        <DropZone hint={HINT} onFileSelect={() => {}} />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Drag-over (simulated)
        </div>
        <DropZone hint={HINT} isDragOver onFileSelect={() => {}} />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Disabled
        </div>
        <DropZone hint={HINT} disabled onFileSelect={() => {}} />
      </div>

    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   3.  File Upload / Single — states
   ════════════════════════════════════════════════════════════════════ */
export const SingleDefault = {
  name: 'File Upload / Single — Default',
  render: () => (
    <div style={{ maxWidth: 400, fontFamily: FONT }}>
      <FileUploadSingle
        label="Upload files"
        hint={HINT}
        required
      />
    </div>
  ),
};

export const SingleUploaded = {
  name: 'File Upload / Single — Uploaded',
  render: () => (
    <div style={{ maxWidth: 400, fontFamily: FONT }}>
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
    <div style={{ maxWidth: 400, fontFamily: FONT }}>
      <FileUploadSingle
        label="Upload files"
        hint={HINT}
        required
        disabled
      />
    </div>
  ),
};

export const SingleInteractive = {
  name: 'File Upload / Single — Interactive',
  render: () => {
    const [file, setFile] = useState(null);
    return (
      <div style={{ maxWidth: 400, fontFamily: FONT }}>
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

/* ════════════════════════════════════════════════════════════════════
   4.  File Upload / Multiple — states
   ════════════════════════════════════════════════════════════════════ */
export const MultipleDefault = {
  name: 'File Upload / Multiple — Default (drop zone only)',
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: FONT }}>
      <FileUploadMultiple hint={HINT} />
    </div>
  ),
};

export const MultipleWithFiles = {
  name: 'File Upload / Multiple — With files (mixed states)',
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: FONT }}>
      <FileUploadMultiple
        hint={HINT}
        files={[
          { id: '1', name: 'File-name.csv',   status: 'uploaded' },
          { id: '2', name: 'Document.pdf',     status: 'loading'  },
          { id: '3', name: 'Report.xlsx',      status: 'error', errorMessage: 'Here goes the helper text.' },
        ]}
        onRemove={() => {}}
      />
    </div>
  ),
};

export const MultipleDisabled = {
  name: 'File Upload / Multiple — Disabled',
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: FONT }}>
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
      <div style={{ maxWidth: 520, fontFamily: FONT }}>
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
