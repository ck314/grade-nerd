import React from 'react';
import { ContentSection } from '../../../data/types';

interface ContentRendererProps {
  sections: ContentSection[];
  isELI5?: boolean;
}

export function ContentRenderer({ sections, isELI5 = false }: ContentRendererProps) {
  return (
    <div className={`space-y-6 ${isELI5 ? 'text-lg' : ''}`}>
      {sections.map((section, index) => (
        <SectionRenderer key={index} section={section} isELI5={isELI5} />
      ))}
    </div>
  );
}

function SectionRenderer({ section, isELI5 }: { section: ContentSection; isELI5: boolean }) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 className={`font-bold ${isELI5 ? 'text-2xl' : 'text-xl'} mt-6 first:mt-0`}>
          {section.content}
        </h2>
      );

    case 'paragraph':
      return (
        <p className={`text-gray-700 leading-relaxed ${isELI5 ? 'text-lg' : ''}`}>
          {section.content}
        </p>
      );

    case 'formula':
      return (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 my-4">
          <pre className="font-mono text-center text-lg whitespace-pre-wrap">
            {section.content}
          </pre>
        </div>
      );

    case 'example':
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p className="font-medium text-yellow-900">
            <span className="font-bold">Example: </span>
            {section.content}
          </p>
        </div>
      );

    case 'calculation':
      return (
        <div className="my-4">
          <p className="font-medium mb-3">{section.content}</p>
          {section.steps && (
            <ol className="list-decimal list-inside space-y-2 ml-4">
              {section.steps.map((step, i) => (
                <li key={i} className="text-gray-700">
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      );

    case 'conclusion':
      return (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 my-4">
          <p className="font-bold text-green-800">
            <span className="mr-2">✓</span>
            {section.content}
          </p>
        </div>
      );

    case 'list':
      return (
        <ul className="list-disc list-inside space-y-2 ml-4">
          {section.items?.map((item, i) => (
            <li key={i} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return <p className="text-gray-700">{section.content}</p>;
  }
}
